import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";

describe('To-Do List Component', () => {
    test('displays all items in the list', () => {
      render(<ToDoList />);

      expect(screen.getByText('Apples')).toBeInTheDocument();
      expect(screen.getByText('Bananas')).toBeInTheDocument();
      
    });

    test('correctly updates the count of checked items', () => {
        render(<ToDoList />);
    
        // check for 0
        expect(screen.getByText('Items bought: 0')).toBeInTheDocument();
    
        // check for apples
        const appleCheckbox = screen.getByRole('checkbox', { name: 'Apples' });
        fireEvent.click(appleCheckbox);  // Simulate checking the checkbox
    
        // check for 1
        expect(screen.getByText('Items bought: 1')).toBeInTheDocument();
    
        // uncheck apples
        fireEvent.click(appleCheckbox); 
    
        // check that 0
        expect(screen.getByText('Items bought: 0')).toBeInTheDocument();
      });
  });