import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "./CoinSelector.css";

function CoinSelector({ coins, selectedCoin, onCoinSelect, excludeCoinId }) {
  const filteredCoins = coins.filter((coin) => coin.id !== excludeCoinId);

  return (
    <div className="coin-selector">
      <Autocomplete
        value={selectedCoin}
        onChange={(event, newValue) => {
          onCoinSelect(newValue);
        }}
        options={filteredCoins}
        getOptionLabel={(option) =>
          `${option.name} (${option.symbol.toUpperCase()})`
        }
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            <img
              src={option.image}
              alt={option.name}
              style={{
                width: "24px",
                height: "24px",
                marginRight: "10px",
                borderRadius: "50%",
              }}
            />
            <span>
              {option.name} ({option.symbol.toUpperCase()})
            </span>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Coin"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "var(--white)",
                // padding: "4px 5px",
                fontSize: "0.875rem",
                "& fieldset": {
                  borderColor: "var(--white)",
                },
                "&:hover fieldset": {
                  borderColor: "#3a80e9",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3a80e9",
                },
              },
              "& .MuiInputLabel-root": {
                color: "var(--grey)",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#3a80e9",
              },
              "& .MuiSvgIcon-root": {
                color: "var(--white)",
              },
            }}
          />
        )}
        sx={{
          width: "100%",
        }}
      />
    </div>
  );
}

export default CoinSelector;
