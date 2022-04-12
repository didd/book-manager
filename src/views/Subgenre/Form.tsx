import { Controller } from "react-hook-form";
import { Checkbox } from "../../lib/components/forms/Checkbox";
import { Input } from "../../lib/components/forms/Input";
import { Stack } from "../../lib/components/Stack";

export function AddNewSubgenreForm() {
  return (
    <Stack direction="column">
      <Controller
        name="name"
        rules={{ required: "Name is required." }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            id="subGenreName"
            placeholder="Subgenre name"
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />
      <Controller
        name="isDescriptionRequired"
        render={({ field: { onChange, value } }) => (
          <Checkbox
            onClick={onChange}
            checked={!!value}
            label="Description is required for this subgenre"
          />
        )}
      />
    </Stack>
  );
}
