import Address from "../models/Address.js";



//Add Address: /api/address/add

export const addAddress = async (req, res) => {
    try {
        const { address } = req.body
        const userId = req.userId

        console.log("DEBUG: userId from req:", userId, "Type:", typeof userId);

        if (!userId || String(userId).trim() === "" || userId === "undefined") {
            return res.json({ success: false, message: `Unauthorized: Invalid User ID (${userId})` });
        }

        const { firstName, lastName, email, street, city, state, zipcode, country, phone } = address;

        const newAddress = new Address({
            userId: userId,
            firstName,
            lastName,
            email,
            street,
            city,
            state,
            zipcode: Number(zipcode),
            country,
            phone: Number(phone)
        })

        console.log("Final Address Object for save:", newAddress);
        await newAddress.save();

        res.json({ success: true, message: 'Address added Successfully' })
    } catch (error) {
        console.error("Add Address Detailed Error:", error);
        res.json({ success: false, message: `Address validation failed: ${error.message}` })
    }
}

// Get Address : /api/address/get

export const getAddress = async (req, res) => {
    try {
        const userId = req.userId
        const addresses = await Address.find({ userId })
        res.json({ success: true, addresses })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}
