<template>
	<!--
    SPDX-FileCopyrightText: Sebastian Stöcker <sebastian.stoecker@uni-marburg.de>
    SPDX-License-Identifier: AGPL-3.0-or-later
    -->
	<NcContent app-name="templateapp">
		<NcAppNavigation>
			<NcAppNavigationNew v-if="!loading"
				:text="t('templateapp', 'New note')"
				:disabled="false"
				button-id="new-templateapp-button"
				button-class="icon-add"
				@click="newNote" />
			<ul>
				<NcAppNavigationItem v-for="note in notes"
					:key="note.title"
					:name="note.title ? note.title : t('templateapp', 'New note')"
					:title="note.title ? note.title : t('templateapp', 'New note')"
					:class="{active: currentNoteId === note.id}"
					@click="openNote(note)">
					<template slot="actions">
						<NcActionButton v-if="note.id === -1"
							icon="icon-close"
							@click="cancelNewNote(note)">
							{{
								t('templateapp', 'Cancel note creation') }}
						</NcActionButton>
						<NcActionButton v-else
							icon="icon-delete"
							@click="deleteNote(note)">
							{{
								t('templateapp', 'Delete note') }}
						</NcActionButton>
					</template>
				</NcAppNavigationItem>
			</ul>
		</NcAppNavigation>
		<NcAppContent>
			<div v-if="currentNote">
				<input ref="title"
					v-model="currentNote.title"
					type="text"
					:disabled="updating">
				<textarea ref="content" v-model="currentNote.content" :disabled="updating" />
				<input type="button"
					class="primary"
					:value="t('templateapp', 'Save')"
					:disabled="updating || !savePossible"
					@click="saveNote">
			</div>
			<div v-else id="emptycontent">
				<div class="icon-file" />
				<h2>
					{{
						t('templateapp', 'Create a note to get started') }}
				</h2>
			</div>
		</NcAppContent>
	</NcContent>
</template>

<script>
import { NcContent, NcAppNavigation, NcAppNavigationItem, NcAppNavigationNew, NcAppContent, NcActionButton } from '@nextcloud/vue'

import '@nextcloud/dialogs/styles/toast.scss'
import { generateUrl } from '@nextcloud/router'
import { showError, showSuccess } from '@nextcloud/dialogs'
import axios from '@nextcloud/axios'

export default {
	name: 'App',
	components: {
		NcContent,
		NcActionButton,
		NcAppContent,
		NcAppNavigation,
		NcAppNavigationItem,
		NcAppNavigationNew,
	},
	data() {
		return {
			notes: [],
			currentNoteId: null,
			updating: false,
			loading: true,
		}
	},
	computed: {
		/**
		 * Return the currently selected note object
		 * @return {object|null}
		 */
		currentNote() {
			if (this.currentNoteId === null) {
				return null
			}
			return this.notes.find((note) => note.id === this.currentNoteId)
		},

		/**
		 * Returns true if a note is selected and its title is not empty
		 * @return {boolean}
		 */
		savePossible() {
			return this.currentNote && this.currentNote.title !== ''
		},
	},
	/**
	 * Fetch list of notes when the component is loaded
	 */
	async mounted() {
		try {
			const response = await axios.get(generateUrl('/apps/templateapp/notes'))
			this.notes = response.data
		} catch (e) {
			console.error(e)
			showError(t('notestutorial', 'Could not fetch notes'))
		}
		this.loading = false
	},

	methods: {
		/**
		 * Create a new note and focus the note content field automatically
		 * @param {object} note Note object
		 */
		openNote(note) {
			if (this.updating) {
				return
			}
			this.currentNoteId = note.id
			this.$nextTick(() => {
				this.$refs.content.focus()
			})
		},
		/**
		 * Action triggered when clicking the save button
		 * create a new note or save
		 */
		saveNote() {
			if (this.currentNoteId === -1) {
				this.createNote(this.currentNote)
			} else {
				this.updateNote(this.currentNote)
			}
		},
		/**
		 * Create a new note and focus the note content field automatically
		 * The note is not yet saved, therefore an id of -1 is used until it
		 * has been persisted in the backend
		 */
		newNote() {
			if (this.currentNoteId !== -1) {
				this.currentNoteId = -1
				this.notes.push({
					id: -1,
					title: '',
					content: '',
				})
				this.$nextTick(() => {
					this.$refs.title.focus()
				})
			}
		},
		/**
		 * Abort creating a new note
		 */
		cancelNewNote() {
			this.notes.splice(this.notes.findIndex((note) => note.id === -1), 1)
			this.currentNoteId = null
		},
		/**
		 * Create a new note by sending the information to the server
		 * @param {object} note Note object
		 */
		async createNote(note) {
			this.updating = true
			try {
				const response = await axios.post(generateUrl('/apps/templateapp/notes'), note)
				const index = this.notes.findIndex((match) => match.id === this.currentNoteId)
				this.$set(this.notes, index, response.data)
				this.currentNoteId = response.data.id
			} catch (e) {
				console.error(e)
				showError(t('notestutorial', 'Could not create the note'))
			}
			this.updating = false
		},
		/**
		 * Update an existing note on the server
		 * @param {object} note Note object
		 */
		async updateNote(note) {
			this.updating = true
			try {
				await axios.put(generateUrl(`/apps/templateapp/notes/${note.id}`), note)
			} catch (e) {
				console.error(e)
				showError(t('notestutorial', 'Could not update the note'))
			}

			this.updating = false
		},
		/**
		 * Delete a note, remove it from the frontend and show a hint
		 * @param {object} note Note object
		 */
		async deleteNote(note) {
			try {
				await axios.delete(generateUrl(`/apps/templateapp/notes/${note.id}`))
				this.notes.splice(this.notes.indexOf(note), 1)
				if (this.currentNoteId === note.id) {
					this.currentNoteId = null
				}
				showSuccess(t('templateapp', 'Note deleted'))
			} catch (e) {
				console.error(e)
				showError(t('templateapp', 'Could not delete the note'))
			}
		},
	},
}
</script>
<style scoped>
	#app-content > div {
		width: 100%;
		height: 100%;
		padding: 20px;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	input[type='text'] {
		width: 100%;
	}

	textarea {
		flex-grow: 1;
		width: 100%;
	}
</style>
