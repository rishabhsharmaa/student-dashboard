import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

interface DynamicIconProps extends LucideProps {
  name: string;
}

function toComponentName(iconName: string): string {
  return iconName
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join("");
}

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const componentName = toComponentName(name);
  const IconComponent = (
    LucideIcons as unknown as Record<
      string,
      React.ComponentType<LucideProps>
    >
  )[componentName];

  if (!IconComponent) {
    const Fallback = LucideIcons.BookOpen;
    return <Fallback {...props} />;
  }

  return <IconComponent {...props} />;
}
