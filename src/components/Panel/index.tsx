import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import countryList from "react-select-country-list";
import styles from "./Panel.module.scss";
import { countryACasesFunction } from "../../store/actions/countryACasesAction";
import { countryBCasesFunction } from "../../store/actions/countryBCasesAction";
import { datesFunction } from "../../store/actions/datesAction";
import { chosenCountriesFunction } from "../../store/actions/chosenCountriesAction";
import { Countries } from "./types";

export const Panel = () => {
  const [countryA, setCountryA] = useState("");
  const [countryB, setCountryB] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const countries: Countries[] = countryList().getData();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await dispatch(countryACasesFunction(countryA, startDate, endDate));
    await dispatch(countryBCasesFunction(countryB, startDate, endDate));
    await dispatch(datesFunction(startDate, endDate));
    await dispatch(chosenCountriesFunction(countryA, countryB));
    history.push("/results");
  };

  // const condition =
  //   (countryA !== countriesList[0] && startDate && endDate) ||
  //   (countryB !== countriesList[1] && startDate && endDate) ||
  //   (startDate !== dates[0] && startDate && endDate) ||
  //   (endDate !== dates[1] && startDate && endDate);

  const condition = countryA && countryB && startDate && endDate;

  return (
    <div className={styles.Container}>
    <form onSubmit={onSubmitHandler} className={styles.Form}>
      <div className={styles.Countries}>
        <div className={styles.CountryContainer}>
          <label className={styles.Label}>COUNTRY 1</label>
          <select
            required
            value={countryA}
            onChange={(e) => setCountryA(e.target.value)}
            className={styles.Country}
          >
            <option value="" disabled>
              -- Select --
            </option>
            {countries
              ? countries.map((country) =>
                  countryB === country.label ? (
                    <option key={country.value} disabled>
                      {country.label}
                    </option>
                  ) : (
                    <option key={country.value}>{country.label}</option>
                  )
                )
              : null}
          </select>
        </div>
        <div className={styles.CountryContainer}>
          <label className={styles.Label}>COUNTRY 2</label>
          <select
            required
            value={countryB}
            onChange={(e) => setCountryB(e.target.value)}
            className={styles.Country}
          >
            <option value="" disabled>
              -- Select --
            </option>
            {countries
              ? countries.map((country) =>
                  countryA === country.label ? (
                    <option key={country.value} disabled>
                      {country.label}
                    </option>
                  ) : (
                    <option key={country.value}>{country.label}</option>
                  )
                )
              : null}
          </select>
        </div>
      </div>
      <div className={styles.Dates}>
        <div className={styles.DateContainer}>
          <label className={styles.Label}>START DATE</label>
          <DatePicker
            required
            placeholderText="-- Select --"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MM/dd/yyyy"
            className={styles.Date}
            maxDate={new Date()}
          />
        </div>
        <div className={styles.DateContainer}>
          <label className={styles.Label}>END DATE</label>
          <DatePicker
            required
            placeholderText="-- Select --"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="MM/dd/yyyy"
            minDate={startDate}
            maxDate={new Date()}
            className={styles.Date}
          />
        </div>
      </div>
      <button
        type="submit"
        className={condition ? styles.active : styles.Submit}
      >
        SUBMIT
      </button>
    </form>
  </div>
  );
};