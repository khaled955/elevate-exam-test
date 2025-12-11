"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils/tailwind-merge";
import { Input } from "./input";

/* ---------------------------- Type Definitions ---------------------------- */

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

/* ------------------------------ Main Component ---------------------------- */

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, value, ...props }, ref) => {
      return (
        <RPNInput.default
          ref={ref}
          className={cn(
            "flex w-full items-stretch gap-2 rounded-lg border border-input bg-background p-1 shadow-sm focus-within:ring-2 focus-within:ring-ring/60",
            className
          )}
          defaultCountry="EG"
          initialValueFormat="national"
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelect}
          inputComponent={InputComponent}
          smartCaret={false}
          value={value || undefined}
          onChange={(val) => onChange?.(val || ("" as RPNInput.Value))}
          {...props}
        />
      );
    }
  );
PhoneInput.displayName = "PhoneInput";

/* ------------------------------ Input Component --------------------------- */

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    // ✅ make sure it's a phone field (no masking)
    type="tel"
    placeholder="enter your phone"
    className={cn(
      "h-10 w-full border-0 bg-transparent px-2 text-base placeholder:text-muted-foreground md:text-sm",
      "focus-visible:ring-0 focus-visible:outline-none",
      className
    )}
    {...props}
  />
));
InputComponent.displayName = "InputComponent";

/* ----------------------------- Country Dropdown --------------------------- */

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value?: RPNInput.Country; // can be undefined
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const callingCode = selectedCountry
    ? RPNInput.getCountryCallingCode(selectedCountry)
    : "";

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open) => {
        if (open) {
          setSearchValue("");
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "inline-flex items-center gap-2 rounded-md border bg-background px-3 py-2 shadow-sm transition-colors",
            "hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring/60",
            "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
          )}
          disabled={disabled}
        >
          {selectedCountry ? (
            <>
              <FlagComponent
                country={selectedCountry}
                countryName={selectedCountry}
              />
              <span className="tabular-nums text-sm text-foreground/70">
                +{callingCode}
              </span>
            </>
          ) : (
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <span className="h-5 w-7 rounded-sm border border-border bg-foreground/10" />
              Select
            </span>
          )}

          <ChevronsUpDown
            className={cn("ml-1 size-4 opacity-70", disabled && "hidden")}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[360px] max-w-[min(92vw,360px)] p-0 rounded-lg border bg-popover text-popover-foreground shadow-xl">
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(value) => {
              setSearchValue(value);
              setTimeout(() => {
                const viewport = scrollAreaRef.current?.querySelector(
                  "[data-radix-scroll-area-viewport]"
                ) as HTMLDivElement | undefined;
                if (viewport) viewport.scrollTop = 0;
              }, 0);
            }}
            placeholder="Search country…"
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="h-72">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                      onSelectComplete={() => setIsOpen(false)}
                    />
                  ) : null
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

/* ------------------------- Single Country Option -------------------------- */

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry?: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
  onSelectComplete: () => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) => {
  const isSelected = selectedCountry ? country === selectedCountry : false;

  return (
    <CommandItem
      className="grid w-full grid-cols-[auto,1fr,auto] items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted/60 data-[selected=true]:bg-accent"
      onSelect={() => {
        onChange(country);
        onSelectComplete();
      }}
    >
      <FlagComponent country={country} countryName={countryName} />
      <span className="truncate font-medium">{countryName}</span>
      <span className="tabular-nums text-foreground/60">
        +{RPNInput.getCountryCallingCode(country)}
      </span>
      <CheckIcon
        className={`ml-2 size-4 text-primary ${
          isSelected ? "opacity-100" : "opacity-0"
        }`}
      />
    </CommandItem>
  );
};

/* ------------------------------- Flag Renderer ---------------------------- */

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  if (!country) {
    return (
      <span className="flex h-5 w-7 items-center justify-center overflow-hidden rounded-sm border border-border bg-foreground/10" />
    );
  }
  const Flag = flags[country];
  return (
    <span className="flex h-5 w-7 items-center justify-center overflow-hidden rounded-sm border border-border bg-foreground/10 [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
