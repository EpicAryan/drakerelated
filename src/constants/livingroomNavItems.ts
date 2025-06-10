import { NavigationType } from "@/components/navigation";

export const livingroomNavConstants: Omit<NavigationType, "onClick">[] = [
  {
    id: "nav1",
    x: 15,
    y: 25,
    direction: "left",
    label: "Exterior",
  },
  {
    id: "nav2",
    x: 70,
    y: 35,
    direction: "right",
    label: "Kitchen",
  },
];
