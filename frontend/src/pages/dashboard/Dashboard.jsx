import React, { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import Form from '../../components/Form'
import List from '../../components/List';
import Header from '../../components/Header';
import ExpensePieChart from '../../components/ExpensePieChart';

const Dashboard = () => {
  const { user } = useUser();
  return (
    <div className='dashboard-container'>
      <Header />
      {/*<h1>Hi {user?.firstName}! Here are your finances!</h1>*/}
      <div className='left-column'>
      <div className='form-container'>
        <Form />
      </div>
      <div className='piechart-container'>
        <ExpensePieChart />
      </div>
      </div>
      <div className='right-column'>
      <div className='list-container'>
        <List />
      </div>
      </div>
    </div>
  )
}

export default Dashboard

