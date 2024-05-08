interface App {
    notes: Array<Note>
    currentNoteId: number | null
    updating: boolean
    loading: boolean
}
interface Note {
    id: number
    title: string
    content: string
}