import { NavigationType } from "@/components/navigation";

export const livingroomNavConstants: Omit<NavigationType, "onClick">[] = [
  {
    id: "nav1",
    x: 15,
    y: 25,
    direction: "left",
    label: "Enter Lounge",
  },
  {
    id: "nav2",
    x: 85,
    y: 25,
    direction: "right",
    label: "Kitchen",
  },
];
