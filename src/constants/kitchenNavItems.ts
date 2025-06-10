import { NavigationType } from "@/components/navigation";

export const kitchenNavConstants: Omit<NavigationType, "onClick">[] = [
  {
    id: "nav1",
    x: 10,
    y: 50,
    direction: "left",
    label: "Living Room",
  },
  {
    id: "nav2",
    x: 82,
    y: 20,
    direction: "right",
    label: "Exterior",
  },
];
