import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert, TouchableOpacity } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import Header1 from './Header1';
import axios from '../axios';
import Spinner from './Spinner';

const NoteScreen = ({ loggedin }) =>
{
    const [noteTitle, setNoteTitle] = useState('');
    const [noteText, setNoteText] = useState('');
    const [reminderDate, setReminderDate] = useState(new Date());
    const [notes, setNotes] = useState([]);
    const [editingNote, setEditingNote] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [updatelist,setupdatelist]=useState(false);
    const [allnotes,setallnotes]=useState(loggedin?[{_id:1,id:1,title:'Sample',text:'Sample text',date:JSON.stringify(new Date())}]:[]);
    const [loading, setloading] = useState(false);
    useEffect(()=>
    {
        axios.get("/getnotes")
        .then(result=>{console.log(result.data);setallnotes(result.data)})
        .catch(err=>{console.log('Notes not found');})
    },[updatelist])
    const addNote = () =>
    {
        if(!loggedin)
        {
            Alert.alert('Login','Kindly Login first to use it');
            return;
        }
        if (noteText) {
            if (editingNote) {
                setloading(true);
                axios.post("/updatedata", { id: editingNote,title:noteTitle,text:noteText,date:reminderDate})
                .then(result=>{console.log('updated',result.data);setupdatelist(!updatelist)})
                .catch(err=>{Alert.alert('unsuccessful','Data not updated');console.log(err);})
                .finally(()=>setloading(false));
                // If we're editing an existing note, update it
                // const updatedNotes = notes.map((note) =>
                //     note.id === editingNote
                //         ? { id: note.id, title: noteTitle, text: noteText, date: reminderDate }
                //         : note
                // );
                // setNotes(updatedNotes);
                setEditingNote(null);
            } else {
                // If we're adding a new note, create it
                // setNotes([...notes, { title: noteTitle, text: noteText, date: reminderDate.toUTCString(), id: Math.random().toString() }]);
                setloading(true);
                axios.post("/addnote", { title: noteTitle, text: noteText,date:reminderDate})
                .then(result=>
                    {
                        console.log('Succesfully note added');
                        setupdatelist(!updatelist);
                    })
                .catch(err=>{console.log('note not added',err);})
                .finally(()=>{setloading(false)})
            }
            setNoteTitle('');
            setNoteText('');
            setReminderDate(new Date());
        } else {
            Alert.alert('Blank Note', 'Text of the note not found');
        }
    };

    const startEditingNote = (id) =>
    {
        if (!loggedin) {
            Alert.alert('Login', 'Kindly Login first to use it');
            return;
        }
        const noteToEdit = allnotes.find((note) => note._id === id);
        if (noteToEdit) {
            setEditingNote(id);
            setNoteTitle(noteToEdit.title);
            setNoteText(noteToEdit.text);
            let tempdate =new Date(noteToEdit.date);
            tempdate.setDate(tempdate.getDate()+1);
            console.log('tempdate',tempdate);
            setReminderDate(tempdate);
        }
    };

    const deleteNote = (id) =>
    {
        if (!loggedin) {
            Alert.alert('Login', 'Kindly Login first to use it');
            return;
        }
        // setNotes(notes.filter((note) => note.id !== id));
        setloading(true);
        axios.post("/deletenote",{id:id})
        .then(result=>{console.log('deleted',result.data);setupdatelist(!updatelist)})
        .catch(err=>{console.log(err);})
        .finally(()=>{setloading(false)})
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <Header1></Header1>
                {loading && <Spinner></Spinner>}
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Note Title"
                        onChangeText={(text) => setNoteTitle(text)}
                        value={noteTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Write a note..."
                        onChangeText={(text) => setNoteText(text)}
                        value={noteText}
                    />
                    <TouchableOpacity className="flex justify-center items-center" onPress={() => { setShowDatePicker(true); }}>
                        <Text className="text-center m-5 border-2 border-slate-300 w-fit p-2 px-5 bg-cyan-700 text-white">Reminder Date</Text>
                    </TouchableOpacity>
                    {showDatePicker && <DatePicker
                        value={reminderDate}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) =>
                        {
                            if (selectedDate !== undefined) {
                                const newDate = new Date(selectedDate);
                                setReminderDate(newDate);
                                setShowDatePicker(false);
                            }
                        }}

                    />}
                    <Button title={editingNote ? 'Update Note' : 'Add Note'} onPress={addNote} />
                    {allnotes.map((item) =>
                    {
                        return (
                            <View key={item._id} style={styles.noteItem}>
                                <Text style={styles.noteTitle}>{item.title}</Text>
                                <Text style={styles.noteText}>{item.text}</Text>
                                <Text style={styles.noteDate}>{item.date}</Text>
                                <View style={styles.noteButtons}>
                                    <TouchableOpacity onPress={() => startEditingNote(item._id)}>
                                        <Text className="p-2 px-4 bg-slate-600 text-white">Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { deleteNote(item._id) }}>
                                        <Text className="p-2 px-4 text-white bg-red-500">Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
    },
    noteItem: {
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 4,
        padding: 16,
        marginVertical: 8,
    },
    noteTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    noteText: {
        fontSize: 14,
        marginTop: 8,
    },
    noteDate: {
        fontSize: 12,
        color: 'gray',
    },
    noteButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
});

export default NoteScreen;
