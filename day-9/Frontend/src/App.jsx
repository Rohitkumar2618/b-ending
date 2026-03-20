import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  function handleSubmit(e){
  e.preventDefault();

    const { title, description } = e.target.elements;
    console.log(title.value, description.value);


  axios.post("http://localhost:3000/api/notes",{
    title:title.value,
    description:description.value
  }).then(res=>{
    console.log(res.data)
    fetchNotes()
  })


  }


  function handleDeleteNote(noteID){
  
    axios.delete("http://localhost:3000/api/notes/"+ noteID).then(res =>{
      console.log(res.data)
          fetchNotes()
    })


  }

  useEffect(() => {
    fetchNotes();
  }, []);


  return (
    <>

       <form className="p-4 mt-2 flex gap-2" onSubmit={handleSubmit}>
        <input className="border-2" name="title" type="text" placeholder="Title" />
        <input className="border-2" name="description" type="text" placeholder="Description" />
        <button className="p-2 rounded-md bg-blue-200">Submit</button>
      </form>
      
      <div className="notes w-full h-screen flex flex-wrap ">
        {notes.map((note) => {
          return (
            <div className="note w-fit h-fit  p-2 m-2 bg-red-100">
              <h1>{note.title}</h1>
              <h2>{note.description}</h2>
             <div className=" flex gap-2 ">
               <button onClick={()=>handleDeleteNote(note._id)} className="p-2 rounded-md bg-red-300" >Delete</button>
               <button className="bg-yellow-200 p-2 rounded-md    ">Update</button>
               </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
