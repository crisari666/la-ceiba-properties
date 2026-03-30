import { useLanguage } from "@/i18n/LanguageContext";
import type { ProjectAmenity, AmenityGroup } from "@/hooks/useProjects";
import { motion } from "framer-motion";
import {
  Check, Waves, Droplets, Zap, Shield, Umbrella, Flower2, Fence,
  Dumbbell, Trophy, Footprints, Users, Baby, PawPrint, Beef, Home,
  DoorOpen, Settings, Recycle, CircleDot, PersonStanding, Bike,
  Mountain, Flag, TreePine, Wind, House, Ship, UtensilsCrossed, Flame,
  Wrench, LayoutGrid, Bath, BadgeCheck
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  category: LayoutGrid, pool: Waves, bolt: Zap, water_drop: Droplets,
  plumbing: Wrench, security: Shield, beach_access: Umbrella, spa: Flower2,
  deck: Fence, hot_tub: Bath, sports_tennis: Trophy, sports_golf: Trophy,
  sports_soccer: CircleDot, sports_volleyball: CircleDot, sports: Trophy,
  hiking: Footprints, groups: Users, waves: Waves, child_care: Baby,
  pets: PawPrint, outdoor_grill: Beef, villa: Home, door_front: DoorOpen,
  admin_panel_settings: Settings, recycling: Recycle,
  sports_basketball: CircleDot, fitness_center: Dumbbell,
  self_improvement: PersonStanding, directions_bike: Bike,
  terrain: Mountain, flag: Flag, park: TreePine, air: Wind,
  cabin: House, kayaking: Ship, restaurant: UtensilsCrossed,
  local_fire_department: Flame,
};

interface Props {
  amenities: ProjectAmenity[];
  amenitiesGroups?: AmenityGroup[];
}

const ProjectAmenities = ({ amenities, amenitiesGroups }: Props) => {
  const { t } = useLanguage();
  const hasGroups = amenitiesGroups && amenitiesGroups.length > 0;

  if (!hasGroups && !amenities?.length) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
      <h2 className="text-lg md:text-xl font-display font-semibold text-foreground mb-4">
        {t.projects.amenities}
      </h2>

      {hasGroups ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenitiesGroups.map((group, idx) => {
            const Icon = ICON_MAP[group.icon] || LayoutGrid;
            return (
              <div key={idx} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-ceiba-warm/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-ceiba-terra" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{group.title}</span>
                </div>
                <ul className="space-y-1.5 pl-1">
                  {group.amenities.map((a, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-ceiba-terra flex-shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {amenities.map((a) => (
            <div key={a._id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border">
              <div className="w-8 h-8 rounded-lg bg-ceiba-warm/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-ceiba-terra" />
              </div>
              <span className="text-sm font-medium text-foreground">{a.title}</span>
            </div>
          ))}
        </div>
      )}

      {/* Financial indicators */}
      <div className="flex flex-wrap items-center gap-4 mt-6 p-4 rounded-xl bg-muted/50 border border-border">
        {["Sin intereses", "Sin fiador", "Sin estudio crediticio"].map((label) => (
          <div key={label} className="flex items-center gap-2">
            <BadgeCheck className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-foreground">{label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectAmenities;
