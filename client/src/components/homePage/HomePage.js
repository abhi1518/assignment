import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "./HomePage.css";
import { countrylist, stateList, cityList } from "../../api";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [validated, setValidated] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [validationError, setValidationError] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [statesList, setStateList] = useState([]);
  const [cityesList, setCityesList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    dob: '', 
    age: ''
  });

  const navigate = useNavigate();

	const handleAllUser = () => {
		navigate('/all-user')
	}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, gender: e.target.value });
    setSelectedOption(e.target.value);
    setError('');
  };

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().slice(0, 10);
    setFormData({ ...formData, dob: formattedDate });
    setSelectedDate(date);
  };

  const validateDate = (date) => {
    if (!date) {
      setValidationError("Please select a date.");
      return false;
    }

    const selectedMoment = moment(date);
    const currentDate = moment();
    const age = currentDate.diff(selectedMoment, "years");
    setFormData({ ...formData, age: age });
    if (age < 14) {
      setValidationError("You must be at least 14 years old.");
      return false;
    }

    setValidationError("");
    return true;
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      if (!selectedOption) {
        setError('Please select an option');
      } else {
        console.log('Selected option:', selectedOption);
      }
    }


    setValidated(true);
    const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(formData),
    redirect: 'follow'
  };

  fetch('http://localhost:8000/api/registration', requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      // Handle the response as needed
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const getCountryList = async () => {
    const result = await countrylist();
    setCountryList(result.data);
  };

  const handleCountry = (event) => {
    const selectedValue = event.target.value;
    setSelectedCountry(selectedValue);
    setFormData({ ...formData, country: selectedValue });
    getStateList(selectedValue);
  };

  const getStateList = async (value) => {
    const result = await stateList(value);
    setStateList(result.data);
  };

  const handleState = (event) => {
    const selectedValue = event.target.value;
    setSelectedState(selectedValue);
    setFormData({ ...formData, state: selectedValue });
    getCityList(selectedValue);
  };

  const getCityList = async (value) => {
    const result = await cityList(value);
    setCityesList(result.data);
  };

  const handleCity = (event) => {
    const selectedValue = event.target.value;
    setFormData({ ...formData, city: selectedValue });
    setSelectedCity(selectedValue);
  };

  useEffect(() => {
    getCountryList();
  }, []);
  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3 mt-5" style={{ justifyContent: "center" }}>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              pattern="[A-Za-z]+"
              title="Please enter only letters (A-Z, a-z)."
              required
              name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            />

            <Form.Control.Feedback type="invalid">
              Please provide first name alphabets only.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3" style={{ justifyContent: "center" }}>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              pattern="[A-Za-z]+"
              title="Please enter only letters (A-Z, a-z)."
              required
              name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide last name alphabets only.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3" style={{ justifyContent: "center" }}>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>E-Mail</Form.Label>
            <Form.Control type="email" placeholder="E-Mail" required name="email"
            value={formData.email}
            onChange={handleChange} />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3" style={{ justifyContent: "center" }}>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Country</Form.Label>
            <br />
            <Form.Select
              value={selectedCountry}
              onChange={handleCountry}
              required
              style={{ width: "100%", height:"40px"  }}
            >
              <option value="" disabled>
                Choose country...
              </option>
              {countryList.map((country) => (
                <option key={country._id} value={country.code}>
                  {country.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a country.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3" style={{ justifyContent: "center" }}>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>State</Form.Label>
            <br />
            <Form.Select
              value={selectedState}
              onChange={handleState}
              required
              style={{ width: "100%", height:"40px" }}
            >
              <option value="" disabled>
                Choose state...
              </option>
              {statesList.map((state) => (
                <option key={state._id} value={state.code}>
                  {state.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a state.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3" style={{ justifyContent: "center" }}>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <br />
            <Form.Select
              value={selectedCity}
              onChange={handleCity}
              required
              style={{ width: "100%", height:"40px"  }}
            >
              <option value="" disabled>
                Choose city...
              </option>
              {cityesList.map((city) => (
                <option key={city._id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a city.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <div className="date_level">
        <div>
            <label>Gender</label>
          </div>
          <label>
            <input
              type="radio"
              value="male"
              checked={selectedOption === 'male'}
              onChange={handleRadioChange}
            />
            Male
          </label>
          <label>
            <input
            className="mx-2"
              type="radio"
              value="female"
              checked={selectedOption === 'female'}
              onChange={handleRadioChange}
            />
            Female
          </label>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
        <div style={{ justifyContent: "center" }}>
          <div>
            <label className="date_level">Date of Birth</label>
          </div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              if (validateDate(date)) {
                handleDateChange(date);
              }
            }}
            maxDate={moment().subtract(14, "years").toDate()} // 14 years ago
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={15}
            dateFormat="MM/dd/yyyy"
            placeholderText="Select Date of Birth"
            className="date_picker"
          />
          {!selectedDate && validationError && (
            <div className="text-danger">{validationError}</div>
          )}
          {selectedDate && (
            <div>
              <h4 className="date_level">
                Age: {moment().diff(selectedDate, "years")}
              </h4>
              {moment().diff(selectedDate, "years") >= 14 ? (
                <p className="date_level">You are older than 14 years.</p>
              ) : (
                <p className="date_level mt-3">
                  You are not older than 14 years.
                </p>
              )}
            </div>
          )}
        </div>
        <Button type="submit" className="submit_button mt-3">
          Submit form
        </Button>
        <Button onClick={handleAllUser} className="submit_button mt-3">
          All User Data
        </Button>

        
      </Form>
    </div>
  );
}

export default HomePage;
