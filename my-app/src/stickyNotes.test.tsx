import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";



describe("Create StickyNote", () => {
    test("renders create note form", () => {
      render(<StickyNotes />);
   
      const createNoteButton = screen.getByText("Create Note");
      expect(createNoteButton).toBeInTheDocument();
    });
   
    test("creates a new note", () => {
      render(<StickyNotes />);
   
   // Please make sure your sticky note has a title and content input field with the following placeholders.
      const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
      const createNoteContentTextarea =
        screen.getByPlaceholderText("Note Content");
      const createNoteButton = screen.getByText("Create Note");
   
      fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
      fireEvent.change(createNoteContentTextarea, {
        target: { value: "Note content" },
      });
      fireEvent.click(createNoteButton);
   
      const newNoteTitle = screen.getByText("New Note");
      const newNoteContent = screen.getByText("Note content");
   
      expect(newNoteTitle).toBeInTheDocument();
      expect(newNoteContent).toBeInTheDocument();
    });
});
   
describe('Sticky Notes Component', () => {

    // read notes
    test('displays all notes that are created', () => {
      render(<StickyNotes />);
  
      // find inputs
      const titleInput = screen.getByPlaceholderText('Note Title');
      const contentInput = screen.getByPlaceholderText('Note Content');
      const createNoteButton = screen.getByText('Create Note');
  
      // creat notes
      fireEvent.change(titleInput, { target: { value: 'Note 1' } });
      fireEvent.change(contentInput, { target: { value: 'Content for Note 1' } });
      fireEvent.click(createNoteButton);
  
      fireEvent.change(titleInput, { target: { value: 'Note 2' } });
      fireEvent.change(contentInput, { target: { value: 'Content for Note 2' } });
      fireEvent.click(createNoteButton);
  
      fireEvent.change(titleInput, { target: { value: 'Note 3' } });
      fireEvent.change(contentInput, { target: { value: 'Content for Note 3' } });
      fireEvent.click(createNoteButton);
  
      //vewrify that displayed
      expect(screen.getByText('Note 1')).toBeInTheDocument();
      expect(screen.getByText('Content for Note 1')).toBeInTheDocument();
      expect(screen.getByText('Note 2')).toBeInTheDocument();
      expect(screen.getByText('Content for Note 2')).toBeInTheDocument();
      expect(screen.getByText('Note 3')).toBeInTheDocument();
      expect(screen.getByText('Content for Note 3')).toBeInTheDocument();
    
    });

    test('updates note title and content', () => {
        render(<StickyNotes />);
    
        
        const titleInput = screen.getByPlaceholderText('Note Title');
        const contentInput = screen.getByPlaceholderText('Note Content');
        const createNoteButton = screen.getByText('Create Note');
    
        
        fireEvent.change(titleInput, { target: { value: 'Initial Title' } });
        fireEvent.change(contentInput, { target: { value: 'Initial Content' } });
        fireEvent.click(createNoteButton);
    
        // verify createdd
        const noteTitle = screen.getByText('Initial Title');
        const noteContent = screen.getByText('Initial Content');
        expect(noteTitle).toBeInTheDocument();
        expect(noteContent).toBeInTheDocument();
    
        // update title and content
        fireEvent.blur(noteTitle, { target: { textContent: 'Updated Title' } });
        fireEvent.blur(noteContent, { target: { textContent: 'Updated Content' } });
    
        // check if updated
        expect(screen.getByText('Updated Title')).toBeInTheDocument();
        expect(screen.getByText('Updated Content')).toBeInTheDocument();
    });

    test('deletes a note', () => {
        render(<StickyNotes />);
    
        //find inputs
        const titleInput = screen.getByPlaceholderText('Note Title');
        const contentInput = screen.getByPlaceholderText('Note Content');
        const createNoteButton = screen.getByText('Create Note');
    
        //create not
        fireEvent.change(titleInput, { target: { value: 'Note to be deleted' } });
        fireEvent.change(contentInput, { target: { value: 'Content to be deleted' } });
        fireEvent.click(createNoteButton);
    
        // not displayed?
        const noteTitle = screen.getByText('Note to be deleted');
        expect(noteTitle).toBeInTheDocument();
    
        // delete
        const deleteButton = screen.getByText('x'); // Assuming the delete button shows 'x'
        fireEvent.click(deleteButton);
    
        // note deleted
        expect(noteTitle).not.toBeInTheDocument();
    });
})
