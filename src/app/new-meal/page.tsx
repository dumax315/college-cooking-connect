"use client";

import PageTitle from "@/components/pageTitle";
import { Meal } from "@/database";
import { Button, FormControl, InputLabel } from "@mui/material";
import React from "react";
import { MultiSelect } from "react-multi-select-component";
import { v4 as uuid } from 'uuid'
import {getAuth} from "firebase/auth";
import {db, firebase_app} from "@/config/firebase/utils";
import { redirect } from "next/navigation";



// TODO
function storeNewMeal(userID: string, meal: Meal){

}

enum Allergies {
    gluten,
    dairy,
    nuts,
    soy,
}
const auth = getAuth(firebase_app);


function newMeal() {
  const [foodName, setFoodName] = React.useState<string>("");
  const [ingredients, setIngredients] = React.useState<string[]>([]);
  const [location, setLocation] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [imageUrlToUpload, setImageUrlToUpload] = React.useState<string>("");
  const [userDate, setUserDate] = React.useState<Date>(new Date(0));
  const [selectedAllergies, setSelectedAllergies] = React.useState([]);
  const [startTime, setStartTime] = React.useState<string>("");
    const [endTime, setEndTime] = React.useState<string>("");

    const convertMiliarty = (time: string): string => {
        let temp: string = time.split(" ")[0];
        if (time.split(" ")[1] == "PM") {
            temp = time.split(":")[0] + 12 + ":" + time.split(":")[1].split(" ")[0];
        }
        return temp;

    };
    


  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();
    if(startTime ==""||endTime==""||auth.currentUser?.uid === undefined || foodName == "" || ingredients.length == 0 || userDate.toString == (new Date(0)).toString || location == ""){
        alert("missing some fields");
    }
    const newUuid = uuid();
    let today = userDate;
    
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    let todayString = mm + "/" + dd + "/" + yyyy;
    let sDate = new Date(todayString + " " +  startTime/*pass your time*/);


    let eDate = new Date(todayString + " " +  endTime/*pass your time*/);

    const meal: Meal = {
        uuid: newUuid,
        name: foodName,
        description: description,
        ingredients:ingredients,
        allergens:selectedAllergies,
        students: [],
        period: [sDate, eDate],
        location:location,

    }

    storeNewMeal(auth.currentUser?.uid as string, meal);

    redirect("/");

  };

  const options = [
    {label: "Gluten", value: Allergies.gluten},
    {label: "Dairy", value: Allergies.dairy},
    {label: "Nuts", value: Allergies.nuts},
    {label: "Soy", value: Allergies.soy},
];
  return (
    <div className="text-black m-auto w-5/6 max-w-prose">
      <PageTitle>Upcoming Meals</PageTitle>
      <form onSubmit={handleForm} className="form flex gap-6  flex-col">
        <InputLabel htmlFor="foodName" className=" gap-2  flex-col ">
          <div className="flex">
            <p className="">Food Name</p>
            <input
              onChange={(e) => setFoodName(e.target.value)}
              required
              type="text"
              name="foodName"
              id="foodName"
              placeholder="dish"
            />
          </div>
        </InputLabel>
        <InputLabel htmlFor="listOfIngredients" className=" gap-2  flex-col ">
          <div className="flex">
            <p className="">Ingredients</p>
            <input
              onChange={(e) => setIngredients(e.target.value.split(","))}
              required
              type="text"
              name="listOfIngredients"
              id="listOfIngredients"
              placeholder="separate with commas"
            />
          </div>
        </InputLabel>
        <InputLabel htmlFor="cookinglocation" className=" gap-2  flex-col ">
          <div className="flex">
            <p className="">location</p>
            <input
              onChange={(e) => setLocation(e.target.value)}
              required
              type="text"
              name="cookinglocation"
              id="cookinglocation"
              placeholder="your dorm kitchen 👀"
            />
          </div>
        </InputLabel>
        <InputLabel htmlFor="mealDescription" className=" gap-2  flex-col ">
          <div className="flex">
            <p className="">Description</p>
            <input
              onChange={(e) => setDescription(e.target.value)}
              
              type="text"
              name="mealDescription"
              id="mealDescription"
              placeholder="any extra details"
            />
          </div>
        </InputLabel>
        <InputLabel htmlFor="dataSelecte" className=" gap-2  flex-col ">
          <div className="flex">
            <p className="">Date</p>
            <input
              onChange={(e) => setUserDate(new Date(e.target.value))}
              required
              type="date"
              name="dataSelecte"
              id="dataSelecte"
            />
          </div>
        </InputLabel>
        <div>
        start
                <input
                    onChange={(e) => {
                        // Create a new Date object from the time value
                        setStartTime(convertMiliarty(e.target.value));
                    }}
                    aria-label="Time"
                    type="time"
                />
                end
                <input
                    onChange={(e) => {
                        setEndTime(convertMiliarty(e.target.value));
                    }}
                    aria-label="Time"
                    type="time"
                />
        </div>
        <InputLabel htmlFor="photoUpload" className=" gap-2  flex-col ">
          <div className="flex">
            <p className="">Photo URL (Optional)</p>
            <input
              onChange={(e) => setImageUrlToUpload(e.target.value)}
              type="text"
              name="photoUpload"
              id="photoUpload"
              placeholder="static image url"
            />
          </div>
        </InputLabel>
        <div>
                    <MultiSelect
                        options={options}
                        value={selectedAllergies}
                        onChange={setSelectedAllergies}
                        labelledBy="Select"
                    />
                </div>
                <Button type="submit" className=" text-start w-full">
                    Submit
                </Button>
      </form>
      
    </div>
  );
}
export default newMeal;