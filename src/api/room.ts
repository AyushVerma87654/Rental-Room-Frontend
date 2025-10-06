import { Room } from "../models/room";
import instance from "./instance";

export const fetchRooms = async () => {
  return instance.get("/fetch-room").then((res) => res.data);
};

export const updateRoom = async (room: Room) => {
  return instance.post("/update-room", room).then((res) => res.data);
};

export const updatePrice = async (price: number) => {
  return instance
    .post("/update-price", { key: "Price Per Unit", value: price })
    .then((res) => res.data.price);
};

export const updateData = async () => {
  return instance.get("/update-data").then((res) => res.data);
};
