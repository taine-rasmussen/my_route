import { SizableText, XStack } from 'tamagui';

export const ItemWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <XStack gap={8} padding={4} display="flex" alignItems="center">
      {children}
    </XStack>
  );
};

export const StyledIcon = ({ Icon }: { Icon: any }) => (
  <Icon size="$2" color="$orange10" />
);

export const StyledText = ({ children }: { children: React.ReactNode }) => (
  <SizableText size="$6" fontWeight="bold">
    {children}
  </SizableText>
);
