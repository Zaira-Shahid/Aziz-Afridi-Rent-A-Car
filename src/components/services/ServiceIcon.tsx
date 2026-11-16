import { Icon, type IconName } from "@/components/ui/Icon";

/**
 * The service data stores Material Symbols names (for example "flight_land"). The site no longer loads
 * that icon font, so each name is mapped to the closest icon of the shared inline SVG set.
 */
const MAP: Record<string, IconName> = {
  schedule: "clock",
  update: "clock",
  hourglass_top: "clock",
  nightlight: "clock",
  verified: "shield-check",
  privacy_tip: "shield-check",
  support_agent: "headset",
  person: "user",
  badge: "user-check",
  person_celebrate: "user-check",
  waving_hand: "smile",
  favorite: "smile",
  water_drop: "car-sparkles",
  sanitizer: "car-sparkles",
  auto_awesome: "car-sparkles",
  auto_fix_high: "car-sparkles",
  local_florist: "car-sparkles",
  celebration: "car-sparkles",
  local_gas_station: "fuel",
  business_center: "briefcase",
  work: "briefcase",
  apartment: "briefcase",
  handshake: "briefcase",
  home_repair_service: "briefcase",
  engineering: "settings",
  speed: "settings",
  monitoring: "settings",
  flight_land: "plane",
  flight_takeoff: "plane",
  flight: "plane",
  airport_shuttle: "car",
  directions_car: "car",
  local_shipping: "car",
  airline_seat_recline_extra: "car",
  luggage: "briefcase",
  inventory_2: "briefcase",
  groups: "users",
  group: "users",
  diversity_3: "users",
  family_restroom: "users",
  receipt_long: "wallet",
  payments: "wallet",
  credit_card: "wallet",
  savings: "wallet",
  percent: "wallet",
  workspace_premium: "crown",
  rocket_launch: "crown",
  priority_high: "alert-circle",
  mail: "mail",
  mark_email_read: "mail",
  call: "phone",
  wifi: "smartphone-check",
  language: "smartphone-check",
  description: "smartphone-check",
  check_circle: "check-circle",
  event: "calendar",
  event_available: "calendar",
  edit_calendar: "calendar",
  calendar_month: "calendar",
  calendar_today: "calendar",
  today: "calendar",
  date_range: "calendar",
  route: "map-pin",
  distance: "map-pin",
  map: "map-pin",
  location_on: "map-pin",
  swap_horiz: "arrow-right",
  search: "search",
};

type ServiceIconProps = {
  name: string;
  size?: number;
  className?: string;
};

export function ServiceIcon({ name, size = 22, className }: ServiceIconProps) {
  return <Icon name={MAP[name] ?? "check-circle"} size={size} className={className} />;
}
