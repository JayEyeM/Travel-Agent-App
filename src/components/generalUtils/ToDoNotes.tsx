import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Textarea,
  VStack,
  HStack,
  Text,
  Switch,
  Input,
  useToast,
} from '@chakra-ui/react';
import { ChevronDownIcon, DeleteIcon, EditIcon, WarningTwoIcon } from '@chakra-ui/icons';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useBrandColors } from './theme';
import ClosableBox2 from './ClosableBox2';

interface Note {
  id: string;
  text: string;
  reminder1?: { date: string; time: string };
  reminder2?: { date: string; time: string };
}

const ToDoNotes: React.FC = () => {
  const [noteText, setNoteText] = useState('');
  const [notesList, setNotesList] = useState<Note[]>([]);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const toast = useToast();

  const { primary, background, secondary, accent, text } = useBrandColors();

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('NotesList') || '[]');
    setNotesList(savedNotes);
  }, []);

  const handleAddNote = () => {
    if (noteText.trim() === '') return;

    const newNote: Note = {
      id: dayjs().format('YYYYMMDDHHmmss'),
      text: noteText.trim(),
    };

    const updatedNotes = [...notesList, newNote];
    setNotesList(updatedNotes);
    localStorage.setItem('NotesList', JSON.stringify(updatedNotes));
    setNoteText('');
    toast({
      title: 'Note added.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleEditNote = (id: string, text: string) => {
    setEditingNoteId(id);
    setNoteText(text);
  };

  const handleSaveEdit = () => {
    const updatedNotes = notesList.map(note =>
      note.id === editingNoteId ? { ...note, text: noteText } : note
    );
    setNotesList(updatedNotes);
    localStorage.setItem('NotesList', JSON.stringify(updatedNotes));
    setEditingNoteId(null);
    setNoteText('');
    toast({
      title: 'Note updated.',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDeleteNote = (id: string) => {
    const updatedNotes = notesList.filter(note => note.id !== id);
    setNotesList(updatedNotes);
    localStorage.setItem('NotesList', JSON.stringify(updatedNotes));
    toast({
      title: 'Note deleted.',
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleReminderToggle = (id: string, reminderNumber: 1 | 2) => {
    const updatedNotes = notesList.map(note => {
      if (note.id === id) {
        const reminderKey = reminderNumber === 1 ? 'reminder1' : 'reminder2';
        if (note[reminderKey]) {
          const { [reminderKey]: _, ...rest } = note;
          return rest;
        } else {
          return {
            ...note,
            [reminderKey]: { date: dayjs().format('YYYY-MM-DD'), time: dayjs().format('HH:mm') },
          };
        }
      }
      return note;
    });
    setNotesList(updatedNotes);
    localStorage.setItem('NotesList', JSON.stringify(updatedNotes));
  };

  const handleReminderChange = (
    id: string,
    reminderNumber: 1 | 2,
    field: 'date' | 'time',
    value: string
  ) => {
    const updatedNotes = notesList.map(note => {
      if (note.id === id) {
        const reminderKey = reminderNumber === 1 ? 'reminder1' : 'reminder2';
        return {
          ...note,
          [reminderKey]: {
            ...note[reminderKey],
            [field]: value,
          },
        };
      }
      return note;
    });
    setNotesList(updatedNotes);
    localStorage.setItem('NotesList', JSON.stringify(updatedNotes));
  };

  return (
    <Box 
    w={"80%"}
    m={"auto"}>
      <Heading as="h2" size="lg" mb={4}>
        To Do List
      </Heading>
      <Textarea
        placeholder="Write your note here..."
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        mb={4}
        outline={"1px solid"}
        outlineColor={secondary}
      />
      <Button onClick={editingNoteId ? handleSaveEdit : handleAddNote} bg={primary} color={secondary} mb={6}
      _hover={{ bg: accent, color: primary }}>
        {editingNoteId ? 'Save Note' : 'Add Note'}
      </Button>
      <VStack spacing={4} align="stretch">
        {notesList.map((note) => (
          <Box
            key={note.id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow={"rgba(0, 0, 0, 0.35) 0px 0px 15px 5px;"}
            bg={background}
            outline={"2px solid"}
            outlineColor={secondary}
            
          >
            <HStack justifyContent="space-between" bg={background}>
              <Text>{note.text}</Text>
              <HStack spacing={3}>
                <Button
                 outline={"1px solid"} outlineColor={accent} color={accent}
                  size="sm"
                  onClick={() => handleEditNote(note.id, note.text)}
                  leftIcon={<EditIcon />}
                >
                  Edit
                </Button>
                <Button size="sm" outline={"1px solid"} outlineColor={"red.300"} color={"red.300"} onClick={() => handleDeleteNote(note.id)}>
                  <DeleteIcon />
                </Button>
              </HStack>
            </HStack>
            <ClosableBox2 title='Set Alerts' onClose={() => console.log('Close button clicked')}
                    onOpen={() => console.log('Open button clicked')} buttonText='Set Reminder Alerts' icon={<WarningTwoIcon />}>
            <Box mt={4}>
              <Text color={secondary} >Reminder 1</Text>
              <Switch
               borderRadius={"full"}
               bg={'red.300'}
               colorScheme={'green'}
                isChecked={!!note.reminder1}
                onChange={() => handleReminderToggle(note.id, 1)}
              />
              {note.reminder1 && (
                <HStack mt={2} display={"flex"} flexDirection={{ base: 'column', md: 'row' }} >
                  <ReactDatePicker
                    selected={new Date(note.reminder1.date)}
                    onChange={(date: Date | null) => {
                        if (date) {
                          handleReminderChange(note.id, 1, 'date', date.toISOString().split('T')[0]);
                        }
                      }}
                  />
                  <Input
                    type="time"
                    value={note.reminder1.time}
                    onChange={(e) => handleReminderChange(note.id, 1, 'time', e.target.value)}
                  />
                </HStack>
              )}
            </Box>
            <Box mt={4}>
              <Text color={secondary} >Reminder 2</Text>
              <Switch
                borderRadius={"full"}
                bg={'red.300'}
                colorScheme={'green'}
                isChecked={!!note.reminder2}
                onChange={() => handleReminderToggle(note.id, 2)}
              />
              {note.reminder2 && (
                <HStack mt={2} display={"flex"} flexDirection={{ base: 'column', md: 'row' }}>
                  <ReactDatePicker
                    selected={new Date(note.reminder2.date)}
                    onChange={(date: Date | null) => {
                        if (date) {
                          handleReminderChange(note.id, 2, 'date', date.toISOString().split('T')[0]);
                        }
                      }}
                  />
                  <Input
                    type="time"
                    value={note.reminder2.time}
                    onChange={(e) => handleReminderChange(note.id, 2, 'time', e.target.value)}
                  />
                </HStack>
              )}

            </Box>
            </ClosableBox2>
          </Box>
            
        ))}
      </VStack>
    </Box>
  );
};

export default ToDoNotes;
