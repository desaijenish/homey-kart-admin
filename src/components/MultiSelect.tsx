import {
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import { FC } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

interface MultiSelectProps {
  options: string[];
  label: string;
  onChange: (value: string[] | undefined) => void;
  value?: string[] | undefined;
}

const MultiSelect: FC<MultiSelectProps> = ({
  options,
  label,
  onChange,
  value,
}) => {
  return (
    <FormControl sx={{ m: 1 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
        input={
          <OutlinedInput
            type={"text"}
            endAdornment={
              <InputAdornment
                position="end"
                sx={{ marginRight: "20px", width: "70px" }}
              >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => onChange([])}
                  edge="end"
                >
                  {value === undefined || (value.length > 0 && <CancelIcon />)}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        }
        renderValue={(selected) => (
          <div>
            <Stack gap={1} direction="row" flexWrap="wrap">
              {selected.map((event) => (
                <Chip
                  key={event}
                  label={event}
                  onDelete={() =>
                    onChange(value?.filter((item) => item !== event))
                  }
                  deleteIcon={
                    <CancelIcon
                      onMouseDown={(event: any) => event.stopPropagation()}
                    />
                  }
                />
              ))}
            </Stack>
          </div>
        )}
      >
        {options.map((name: string) => (
          <MenuItem
            key={name}
            value={name}
            sx={{ justifyContent: "space-between" }}
          >
            {name}
            {value?.includes(name) ? <CheckIcon color="info" /> : null}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;
