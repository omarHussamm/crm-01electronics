import React, { useState } from 'react'
import Head from 'next/head'
import Footer from '../../components/Footer'
import Clients from '../../components/Clients';
import Leads from '../../components/Leads';
import Dashboard from '../../components/Dashboard';

export default function Me() {
    

    const [active,setActive] = useState('dashboard');

    const handleDashboard = () => {
        setActive('dashboard')

    }
    const handleActions = () => {
        setActive('clients')
    }
    const handleLeads = () => {
        setActive('leads')
    }
    const handleLogout = () => {
        console.log("logout")
    }
    return (
        <div>
            <Head>
                <title>01 Electronics</title>
                <meta name='description' content='CRM for clients and leads'/>
                <meta name='keywords' content='clients, leads' />
                <link rel="icon" href="/logo.png" />
            </Head>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-primary">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <span className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <i className="bi bi-list"></i> <span className="fs-5 d-none d-sm-inline mx-2">Menu</span>
                            </span>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
                                <li className="nav-item mt-4">
                                    <button onClick={handleDashboard} className="nav-link align-middle px-0 text-white">
                                        <i className="fs-4 bi-house-fill"> </i><span className="ms-1 d-none d-sm-inline">Dahboard</span>
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button onClick={handleActions} className="nav-link align-middle px-0 text-white">
                                        <i className="fs-4 bi-people-fill"></i> <span className="ms-1 d-none d-sm-inline">Clients</span>
                                    </button>
                                </li>
                                <li className="nav-item mb-4">
                                    <button onClick={handleLeads} className="nav-link align-middle px-0 text-white">
                                        <i className="fs-4 bi-binoculars-fill"></i> <span className="ms-1 d-none d-sm-inline">Leads</span>
                                    </button>
                                </li>

                                <li className="nav-item">
                                    <button onClick={handleLogout} className="nav-link align-middle px-0 text-white">
                                        <i className="fs-4 bi-box-arrow-left"></i> <span className="ms-1 d-none d-sm-inline">Log Out</span>
                                    </button>
                                </li>

                            </ul>

                        </div>
                    </div>
                    <div className="col py-3">
                        <div className='full-page'>
                        {(active==='dashboard') &&
                        <Dashboard></Dashboard>
                        }
                        {(active==='clients') &&
                            <Clients></Clients>
                        }
                        {(active==='leads') &&
                            <Leads></Leads>
                        }
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        </div>
    )
}
