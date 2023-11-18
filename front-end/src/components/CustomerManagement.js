import React, { useState, useEffect } from "react";
import { Input, Button, Panel } from "rsuite";
import DataSender from "./DataSender";
import DataFetcher from "./DataFetcher";
import "./styles/ProviderManagement.css";

const CustomerManagement = ({ user }) => {
  const [customerData, setCustomerData] = useState("");
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const dataSender = new DataSender();
  const dataFetcher = new DataFetcher();

  useEffect(() => {
    const fetchDataWithDelay = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const customer = await dataFetcher.getCustomerData(user.getUID());
        setCustomerData(customer);
        if (loading) {
          setUid(customer.uid);
          setName(customer.name);
          setEmail(customer.email);
          setPhoneNumber(customer.phone_number);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataWithDelay();
  }, [loading]);

  const updateCustomerInfo = () => {
    if (!email || !phoneNumber) {
      window.alert("Please fill in all input fields.");
      return;
    }
    const shouldUpdate = window.confirm(
      "Are you sure you want to update customer information?"
    );

    if (shouldUpdate) {
      const customer = {
        uid: uid,
        name: name,
        email: email,
        phone_number: phoneNumber,
      };

      window.alert("Successfully updated customer.");
      dataSender.updateCustomerData(customer, customerData.uid).then(() => {
        console.log("Customer information updated.");
      });
      setLoading(true);
    }
  };

  return (
    <div className="provider-management">
      <h2 className="provider-title">USER MANAGEMENT</h2>
      {loading ? (
        <h2 className="provider-loading">Loading...</h2>
      ) : (
        <>
          <Panel
            className="provider-information"
            header={<h3 className="provider-title">INFORMATION</h3>}
          >
            <div className="provider-input-fields">
              <div className="provider-input-flied">
                <h5>Name</h5>
                <Input
                  className="provider-custom-input"
                  placeholder="Name"
                  value={name}
                  onChange={(value) => setName(value)}
                />
              </div>
              <div className="provider-input-flied">
                <h5>Phone Number</h5>
                <Input
                  className="provider-custom-input"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(value) => setPhoneNumber(value)}
                />
              </div>
              <div className="provider-input-flied">
                <h5>Email</h5>
                <Input
                  className="provider-custom-input"
                  placeholder="Email"
                  value={email}
                  onChange={(value) => setEmail(value)}
                />
              </div>
            </div>
            <br />
            <Button
              className="provider-add-button"
              appearance="primary"
              onClick={updateCustomerInfo}
            >
              Update Information
            </Button>
          </Panel>
        </>
      )}
    </div>
  );
};

export default CustomerManagement;
