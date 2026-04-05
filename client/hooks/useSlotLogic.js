import { useState, useEffect } from 'react';
import moment from 'moment';
import { Alert } from 'react-native';

export const useSlotLogic = (route) => {
  const today = moment().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedCourt, setSelectedCourt] = useState([]);
  const [selectedSport, setselectedSport] = useState(route.params.sports[0].name);
  const [duration, setDuration] = useState(60);
  const [checkedTimes, setCheckedTimes] = useState([]);
  const [timess, setTimes] = useState([]);

  const price = route.params.sports
    .filter(item => item.name === selectedSport)
    .map(item => item.price)[0];

  const courts = route.params.sports.filter(item => item.name === selectedSport);

  // Generate Slots
  useEffect(() => {
    const start = moment(selectedDate).startOf('day').add(6, 'hours');
    const end = moment(selectedDate).endOf('day');
    const result = [];
    let current = moment(start);
    while (current <= end) {
      result.push(current.format('h:mma'));
      current.add(60, 'minutes');
    }
    setTimes(result);
  }, [selectedDate]);

  // Check past/future status
  useEffect(() => {
    const currentDateTime = moment();
    const selectedDateStart = moment(selectedDate).startOf('day');
    const updated = timess.map(item => {
      const dateTime = moment(selectedDateStart).set({
        hour: moment(item, 'h:mma').get('hour'),
        minute: moment(item, 'h:mma').get('minute'),
      });
      return { time: item, status: currentDateTime.isBefore(dateTime) };
    });
    setCheckedTimes(updated);
  }, [selectedDate, timess]);

  const isSlotBooked = (time) => {
    return route?.params?.bookings?.some(booking => {
      if (booking.date !== selectedDate) return false;
      const [start, end] = booking.time.split(' - ');
      const getH = (t) => {
        let h = parseInt(t.split(':')[0], 10);
        if (t.toLowerCase().includes('pm') && h < 12) h += 12;
        if (t.toLowerCase().includes('am') && h === 12) h = 0;
        return h;
      };
      const cH = getH(time);
      return cH >= getH(start) && cH < getH(end);
    });
  };

  const handleTimePress = (time) => {
    if (isSlotBooked(time)) {
      Alert.alert('Slot Already Booked', 'This slot is taken.');
    } else {
      setSelectedTime(time);
    }
  };

  return {
    courts,
    price,
    selectedDate, setSelectedDate,
    selectedTime, setSelectedTime,
    selectedCourt, setSelectedCourt,
    selectedSport, setselectedSport,
    duration, setDuration,
    checkedTimes, price, courts,
    isSlotBooked,
    handleTimePress, isSlotBooked
  };
};