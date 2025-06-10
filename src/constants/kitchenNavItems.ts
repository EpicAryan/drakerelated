import { NavigationType } from "@/components/navigation";

export const kitchenNavConstants: Omit<NavigationType, "onClick">[] = [
  {
    id: "nav1",
    x: 10,
    y: 20,
    direction: "left",
    label: "Back to Living Room",
  },
  {
    id: "nav2",
    x: 90,
    y: 20,
    direction: "right",
    label: "Exterior",
  },
];
