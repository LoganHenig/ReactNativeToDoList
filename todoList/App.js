import { StatusBar } from 'expo-status-bar';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import MyTask from './components/MyTask';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('')
  
  const handleAddTask = () => {
    if(inputText !== ""){
      Keyboard.dismiss();
      console.log('adding ' + inputText);
      setTasks([...tasks, inputText]);
      setInputText('');
    }
  }

  useEffect(()=>{
  console.log(inputText)
  console.log(tasks)
  },[tasks])

  const completeTask = (index) =>{
    let tasksCopy = [...tasks];
    tasksCopy.splice(index,1)
    setTasks(tasksCopy);
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style = {styles.items}>

          {
            tasks.map((taskText, index)=>{
              return(
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <MyTask text={taskText}/>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"} style={styles.writeTaskWrapper}>
        <TextInput style={styles.input} placeholder='Write a task' value={inputText} onChangeText={text => {setInputText(text)}}/>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style ={styles.addText}>
              +
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight:'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper:{
    position: 'absolute',
    bottom: 65,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper:{
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 60,

  },
  addText:{

  },
  
  
});
