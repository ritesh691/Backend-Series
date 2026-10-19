import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {user} from "../models/user.model.js";
import {uploadToCloudinary} from "../utils/cloudinary.js";
import Apiresponse from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
    // get user details from request frontend
    //validation - not empty
    //check if user already exists: username, email
    //check for images, check for avatar
    //upload then to cloudinary, avatar
    //create user object  -  create entry in db 
    //remove password and refresh token field from response
    // check for creation
    //return response




    const {fullName, email, password} = req.body
    console.log("email", email);
    if ([fullName, email, username, password].some(field => field?.trim() === "")) {
        throw new ApiError("All fields are required", 400)
    }
    
   const existingUser = await user.findOne({
        $or: [{ username }, { email } ]
    })
    if (existingUser) {
        throw new ApiError("User already exists", 409)
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
      const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError("Avatar is required", 400)
    }
    const avatar = await uploadToCloudinary(avatarLocalPath)

    if (!coverImageLocalPath) {
        throw new ApiError("Cover image is required", 400)
    }
    const coverImage = await uploadToCloudinary(coverImageLocalPath);
    if (!avatar){
        throw new ApiError("Avatar upload failed", 500)
    }
    
const user = await user.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
})

const createUser = await user.findById(user._id).select("-password -refreshToken")

if (!createUser) {
    throw new ApiError("User creation failed", 500)
}

    return res.status(201).json(new Apiresponse(201, createUser, "User created successfully"))

})

export {registerUser,}