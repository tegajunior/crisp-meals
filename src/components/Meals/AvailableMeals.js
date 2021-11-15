import { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";

import MealItem from "./MealItem/MealItem";


const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState()
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://using-custom-hooks-b2687-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false)
    }
    fetchMeals().catch((err) => {
      setIsLoading(false);
      setHttpError(err.message);
    })
  }, []);
  
  if(isLoading) {
    return <p className={classes.meatIsLoading}>Loading...</p>;
  }

  if (httpError) {
    return <section><p className={classes.errorText}>{httpError}</p></section>
  }

  const mealList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      id={meal.id}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
