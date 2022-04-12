import { Controller } from "react-hook-form";
import { Input } from "../../lib/components/forms";
import { Select } from "../../lib/components/forms";
import { Stack } from "../../lib/components/Stack";

type Props = {
  showDescription: boolean;
};

export function AddBookForm({ showDescription }: Props) {
  return (
    <Stack direction="column" spacing={0}>
      <Controller
        name="title"
        rules={{ required: "Title is required." }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            id="title"
            label="Book title"
            placeholder="Book title"
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />
      <Controller
        name="author"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Select
            label="Author"
            placeholder="Author"
            options={[
              { value: "Gary Allen", label: "Gary Allen" },
              { value: "Thomas Davidson", label: "Thomas Davidson" },
              { value: "Ali Hendy", label: "Ali Hendy" },
            ]}
            value={value}
            onChange={() => {}}
            errors={error?.message}
          />
        )}
      />
      <Controller
        name="isbn"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            id="title"
            label="ISBN"
            placeholder="ISBN"
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />
      <Controller
        name="publisher"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Select
            label="Publisher"
            placeholder="Publisher"
            options={[
              { value: "Pink Unicorn", label: "Pink Unicorn" },
              { value: "Orca", label: "Orca" },
            ]}
            value={value}
            onChange={() => {}}
            errors={error?.message}
          />
        )}
      />
      <Stack>
        <Controller
          name="datePublished"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              id="title"
              type={"date"}
              label="Date published"
              placeholder="DD/MM/YYYY"
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
      </Stack>
      <Stack>
        <Controller
          name="numberOfPages"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              id="title"
              type={"number"}
              label="Number of pages"
              placeholder="Number of pages"
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
      </Stack>
      <Stack>
        <Controller
          name="format"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Select
              label="Format"
              placeholder="Format"
              options={[
                { value: "Digital", label: "Digital" },
                { value: "Hard copy", label: "Hard copy" },
              ]}
              value={value}
              onChange={() => {}}
              errors={error?.message}
            />
          )}
        />
      </Stack>
      <Stack>
        <Controller
          name="edition"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              id="title"
              label="Edition"
              placeholder="Edition"
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="editionLanguage"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Select
              label="Edition language"
              placeholder="Edition language"
              options={[
                { value: "English", label: "English" },
                { value: "French", label: "French" },
                { value: "Arabic", label: "Arabic" },
              ]}
              value={value}
              onChange={() => {}}
              errors={error?.message}
            />
          )}
        />
      </Stack>
      {showDescription && (
        <Controller
          name="description"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              id="description"
              as="textarea"
              label="Description"
              placeholder="description"
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
      )}
    </Stack>
  );
}
