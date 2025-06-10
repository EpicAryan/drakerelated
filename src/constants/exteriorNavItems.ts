import { NavigationType } from "@/components/navigation";

export const exteriorNavConstants: Omit<NavigationType, "onClick">[] = [
  {
    id: "nav1",
    x: 40,
    y: 25,
    direction: "left",
    label: "Kitchen",
  },
  {
    id: "nav2",
    x: 80,
    y: 50,
    direction: "right",
    label: "Living Room",
  },
];
