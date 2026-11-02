import "dotenv/config";
import mongoose from "mongoose";
import {connectDB} from "../src/db.js";
import {User,Food} from "../src/models.js";
const foods=[
["Margherita Pizza","Pizza","Classic cheese, basil & tomato",249,299,4.9,"https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80",true,99],
["Crispy Smash Burger","Burgers","Double patty, cheddar & house sauce",199,249,4.8,"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",false,98],
["Paneer Tikka Bowl","Indian","Smoky paneer, rice & mint chutney",229,null,4.9,"https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80",true,97],
["Creamy Alfredo Pasta","Pasta","Silky parmesan sauce & fresh herbs",279,319,4.7,"https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=700&q=80",true,92],
["Chicken Dum Biryani","Indian","Slow-cooked rice, fragrant spices",289,null,4.9,"https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=700&q=80",false,96],
["Dragon Veg Noodles","Asian","Wok-tossed noodles with crunchy veg",189,219,4.6,"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=80",true,88],
["Chocolate Lava Cake","Desserts","Warm chocolate centre, pure happiness",129,null,4.8,"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80",true,90],
["Mango Smoothie","Drinks","Real mango, yogurt & a little sunshine",99,119,4.7,"https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=700&q=80",true,85],
["Loaded Farmhouse Pizza","Pizza","Mushroom, peppers, olives & mozzarella",329,379,4.8,"https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80",true,94],
["Spicy Chicken Burger","Burgers","Crispy chicken, slaw & chili mayo",229,null,4.7,"https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=700&q=80",false,91],
["Veggie Sushi Roll","Asian","Avocado, cucumber & seasoned rice",259,null,4.6,"https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=700&q=80",true,80],
["Strawberry Cheesecake","Desserts","Creamy cheesecake with berry swirl",159,189,4.9,"https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80",true,89]
].map(([name,category,description,price,oldPrice,rating,image,vegetarian,popular])=>({name,category,description,price,oldPrice,rating,image,vegetarian,popular,available:true}));
try{await connectDB();await Food.deleteMany({});await Food.insertMany(foods);const email=(process.env.ADMIN_EMAIL||"admin@quickbite.demo").toLowerCase(),password=process.env.ADMIN_PASSWORD||"ChangeThisAdminPassword123!";let u=await User.findOne({email});if(!u)await User.create({name:"QuickBite Admin",email,password,role:"admin"});else if(u.role!=="admin"){u.role="admin";await u.save()}console.log(`Seeded ${foods.length} menu items. Admin: ${email}`)}catch(e){console.error(e);process.exitCode=1}finally{await mongoose.disconnect()}
