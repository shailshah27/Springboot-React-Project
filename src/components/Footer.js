import React from 'react'
import { Container } from 'react-bootstrap'
import Col from 'react-bootstrap/esm/Col'
import {Navbar} from 'react-bootstrap'

export default function Footer() {
    let year = new Date().getFullYear();
  return (
    <div>
      <Navbar fixed="bottom" bg="dark" variant="dark">
        <Container className="text-center text-muted">
            <Col lg={12} className="text-centert text-light">
                {year} - All Rights are reserved!!!
            </Col>
        </Container>
      </Navbar>
    </div>
  )
}
