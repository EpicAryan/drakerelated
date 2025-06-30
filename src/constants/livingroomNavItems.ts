import { NavigationType } from "@/components/navigation";

export const livingroomNavConstants: Omit<NavigationType, "onClick">[] = [
  {
    id: "nav1",
    x: 37,
    y: 45,
    direction: "left",
    label: "Entrance",
    imageUrl: "https://images.ctfassets.net/m3x6aw9x53qp/8I7Rjg7Eqg6aOJtJA9if5/788069718d4985de9cc389ca3a314533/entrance.webp"
  },
  {
    id: "nav2",
    x: 70,
    y: 35,
    direction: "right",
    label: "Kitchen",
    imageUrl: "https://images.ctfassets.net/m3x6aw9x53qp/6j8VmhENES1Th483YrQPW4/cebd48ae9f7dd1da7950f347eb87ba3e/kitchen.webp"
  },
];
