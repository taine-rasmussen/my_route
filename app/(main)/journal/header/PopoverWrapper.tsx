import { Popover, Button } from 'tamagui';
import { useState } from 'react';

interface IPopoverWrapper {
  trigger: React.ReactNode;
  content: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const PopoverWrapper = (props: IPopoverWrapper) => {
  return (
    <Popover
      size="$5"
      allowFlip
      stayInFrame
      offset={10}
      placement="bottom"
      onOpenChange={props.onOpenChange}
      open={props.isOpen}
    >
      <Popover.Trigger asChild>{props.trigger}</Popover.Trigger>
      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        width={250}
        height={250}
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={['bouncy', { opacity: { overshootClamping: true } }]}
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
        {props.content}
      </Popover.Content>
    </Popover>
  );
};

export default PopoverWrapper;
