import { NavigationType } from "@/components/navigation";

export const kitchenNavConstants: Omit<NavigationType, "onClick">[] = [
  {
    id: "nav1",
    x: 28,
    y: 39,
    direction: "left",
    label: "Living Room",
    imageUrl: "https://images.ctfassets.net/m3x6aw9x53qp/6HM7uQVRZ5N3JZfIvBINwm/7a5181a049e5a75d4f18344793def185/Living_Room.webp"
  },
  {
    id: "nav2",
    x: 75,
    y: 20,
    direction: "right",
    label: "Exterior",
    imageUrl: "https://images.ctfassets.net/m3x6aw9x53qp/8I7Rjg7Eqg6aOJtJA9if5/788069718d4985de9cc389ca3a314533/entrance.webp"
  },
];
