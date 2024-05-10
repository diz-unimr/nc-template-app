// SPDX-FileCopyrightText: Sebastian Stöcker <sebastian.stoecker@uni-marburg.de>
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface Note {
    id: number
    title: string
    content: string
}

export interface AppData {
    notes: Array<Note>
    currentNoteId: number | null
    updating: boolean
    loading: boolean
}
