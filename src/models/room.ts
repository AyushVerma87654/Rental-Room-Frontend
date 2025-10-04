export type Room = {
  roomId: string;
  name: string;
  renterName: string;
  reading: number;
  lastUpdated: Date | null;
  status: RoomStatus;
};

export type Rooms = Record<string, Room>;

export enum RoomStatus {
  occupied = "OCCUPIED",
  vacant = "VACANT",
}
