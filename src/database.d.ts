type Student = {
    userID: string;
    // reference to allergen
    allergies: Allergy[];
    schedule: Day[];
}

type User = {
    uuid: string;
    username: string;
    emailAddress: string;
}

type Cook = {
    userID: string;
    // reference to meal
    events: Meal[];
}

type Meal = {
    uuid: string;
    name: string;
    description: string;
    ingredients: string[];
    //reference to allergens
    allergens: Allergy[];
    //reference to students
    students: Student[];
    period: [Date, Date];
    location: string;
}

type Day = {
    daysOfWeek: DaysofWeek;
    period: [Date, Date]; // [start, end]
};

export enum Allergy {
    gluten,
    dairy,
    nuts,
    soy,
}

type DaysofWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
