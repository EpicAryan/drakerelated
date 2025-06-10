import { NavigationType } from "@/components/navigation";

export const exteriorNavConstants: Omit<NavigationType, "onClick">[] = [
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
    direction: "left",
    label: "Kitchen",
  },
  {
    id: "nav3",
    x: 50,
    y: 15,
    direction: "left",
    label: "Upstairs",
  },
];
