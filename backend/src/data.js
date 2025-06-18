//cơ sở dữ liệu món ăn
export const sample_foods = [
    {
        id:1,
        name:"Pizza Hải sản",
        cookTime:"10-20 phút",
        price:10,
        favorite:false,
        origins:["italy","us"],
        stars:4,
        image:"pz1.jpg",
        tags:["Hải sản","Mặn","Ngon"]
    },
    {
        id:2,
        name:"Hăm bơ gơ",
        cookTime:"10-25 phút",
        price:20,
        favorite:true,
        origins:["italy","us"],
        stars:4.5,
        image:"Bg1.jpg",
        tags:["Bò","Mặn","Ngon"]
    },
    {
        id:3,
        name:"Gà rán",
        cookTime:"5-10 phút",
        price:10,
        favorite:false,
        origins:["germany","us"],
        stars:4,
        image:"Ck1.jpg",
        tags:["Đồ ăn nhanh ","Mặn","Ngon"]
    },
    {
        id:4,
        name:"Gà rán chiên mắm",
        cookTime:"10-20 phút",
        price:10,
        favorite:false,
        origins:["italy","us"],
        stars:4,
        image:"Ck2.jpg",
        tags:["Hải sản","Mặn","Ngon"]
    },
    {
        id:5,
        name:"Khoai tây chiên",
        cookTime:"10-20 phút",
        price:10,
        favorite:false,
        origins:["italy","us"],
        stars:4,
        image:"Ktc1.jpg",
        tags:["Hải sản","Mặn","Ngon"]
    },
    {
        id:6,
        name:"Combo No nê",
        cookTime:"10-20 phút",
        price:10,
        favorite:false,
        origins:["italy","us"],
        stars:4,
        image:"Cb1.jpg",
        tags:["Hải sản","Mặn","Ngon"]
    },
];
//cơ sở dữ liệu tag
export const sample_tags = [
    {
        name:"Tất cả",
        count:6
    },
    {
        name:"Hải sản",
        count:2
    },
    {
        name:"Mặn",
        count:2
    },
    {
        name:"Ngon",
        count:1
    },
];

export const sample_users = [
    {
        id:1,
        name:"Quang Minh",
        email:"minh@gmail.com",
        password:"123456",
        address:"HCM",
        isAdmin:true
    },
    {
        id:2,
        name:"Quang Minh2",
        email:"minh2@gmail.com",
        password:"123456",
        address:"HCM",
        isAdmin:false
    },
];