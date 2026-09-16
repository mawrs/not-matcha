import { Cluster } from "./container";
import { Text } from "./text";

export function Rule() {
  return <div className="h-hairline flex-1 bg-border-strong" />;
}

export function OrRule() {
  return (
    <Cluster gap="rule">
      <Rule />
      <Text as="span" size="caption" tone="faint">
        or
      </Text>
      <Rule />
    </Cluster>
  );
}
