
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import states from "./states";

export function PaymentForm({ populateShipping }) {
  

  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>First</Form.Label>
          <Form.Control type="text" placeholder="Mad" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Last</Form.Label>
          <Form.Control type="text" placeholder="Hatter" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>

      <Row className="mb-3">

        <Form.Group as={Col} controlId="formGridCard" className="col-8">

          <Form.Label>Credit/Debit</Form.Label>
          <Form.Control type="text" placeholder="0000-0000-0000-0000" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCode">
          <Form.Label>CVC</Form.Label>
          <Form.Control type="text" placeholder="123" />
        </Form.Group>

      </Row>


      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="Charleston" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>

            {states.map((state, index) => (
              <option key={index}>{state}</option>
            ))}

          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="12345"/>
        </Form.Group>
      </Row>


      <Button
        onSubmit={(e) => populateShipping(e)}
        className="mb-4"
        variant="primary"
        type="submit"
      >
        Shipping to same address
      </Button>

    </Form>
  );
}


export function ShippingForm({handleSubmit}) {

    return (
        <Form>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail" className="col-8">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="For confirmation" />
        </Form.Group>

      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>First</Form.Label>
          <Form.Control type="text" placeholder="Enter name" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Last</Form.Label>
          <Form.Control type="text" placeholder="Enter name" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>Choose...</option>

           { states.map((state, index)=>
                 (
                    <option key={index}>{state}</option>
                )
            )}

          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        <Form.Check type="checkbox" label="Click to receive order updates" />
      </Form.Group>


      <Button
        className="mb-4"
        onSubmit={(e) => handleSubmit(e)}
        variant="primary"
        type="submit"
        href="/orders"
      >
        Submit
      </Button>
    </Form>
  );
}

