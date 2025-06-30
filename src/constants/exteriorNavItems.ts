import { NavigationType } from "@/components/navigation";

export const exteriorNavConstants: Omit<NavigationType, "onClick">[] = [
  {
    id: "nav1",
    x: 46,
    y: 25,
    direction: "left",
    label: "Kitchen",
    imageUrl: "https://images.ctfassets.net/m3x6aw9x53qp/6j8VmhENES1Th483YrQPW4/cebd48ae9f7dd1da7950f347eb87ba3e/kitchen.webp"
  },
  {
    id: "nav2",
    x: 79,
    y: 52,
    direction: "right",
    label: "Living Room",
    imageUrl: "https://images.ctfassets.net/m3x6aw9x53qp/6HM7uQVRZ5N3JZfIvBINwm/7a5181a049e5a75d4f18344793def185/Living_Room.webp"
  },
];
