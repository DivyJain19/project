import React from 'react';
import { useState, useRef } from 'react';
import { StyleSheet, View, Dimensions, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AddressBar from '../common/AddressBar';
import { AddressDetails } from '@/store/locationStore';

interface MapSelectorProps {
  onNext: (address: AddressDetails) => Promise<void>;
}
const MapSelector: React.FC<MapSelectorProps> = ({ onNext }) => {
  const mapRef = useRef(null);
  const [locationDetails, setLocationDetails] = useState<any>();
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
  });
  const initialRegion = {
    latitude: 12.9716, // Example: Bangalore
    longitude: 77.5946,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const handleMapPress = async (e: any) => {
    const coordinate = e.nativeEvent.coordinate;
    setMarkerCoordinate(coordinate);
    setLocationDetails(null); // Clear previous details

    try {
      const apiKey = 'b801bb84f3d5403ba8d9158059b1279d'; // Replace with your OpenCage API key
      const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${coordinate.latitude},${coordinate.longitude}&key=${apiKey}&pretty=1`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const firstResult = data.results[0];
        setLocationDetails({
          formattedAddress: firstResult.formatted,
          road: firstResult.components.road,
          houseNumber: firstResult.components.house_number,
          neighbourhood: firstResult.components.neighbourhood,
          suburb: firstResult.components.suburb,
          city: firstResult.components.city,
          postcode: firstResult.components.postcode,
          state: firstResult.components.state,
          country: firstResult.components.country,
        });
      } else {
        console.warn('No results found for the given coordinates.');
        setLocationDetails({ formatted: 'No address found' });
      }
    } catch (error) {
      console.error('Error fetching location details:', error);
      setLocationDetails({ formatted: 'Error fetching address' });
    }
  };

  const handleOnNext = () => {
    if (locationDetails && locationDetails.formattedAddress) {
      const addressParts = [];
      if (locationDetails.road) {
        addressParts.push(locationDetails.road);
      }
      if (locationDetails.houseNumber) {
        addressParts.push(locationDetails.houseNumber);
      }
      if (locationDetails.neighbourhood) {
        addressParts.push(`(${locationDetails.neighbourhood})`);
      }
      const addressObject: AddressDetails = {
        addressLine1: locationDetails.formattedAddress || '',
        addressLine2: addressParts.join(', ') || undefined,
        city: locationDetails.city || '',
        state: locationDetails.state || '',
        pincode: locationDetails.postcode || '',
        tag: 'Others',
      };
      onNext(addressObject);
    } else {
      console.log('No location details available to confirm.');
    }
  };
  return (
    <View style={styles.mapContainer}>
      <MapView
        onPress={handleMapPress}
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        userInterfaceStyle="light"
      >
        <Marker onPress={handleMapPress} coordinate={markerCoordinate}>
          <View>
            <Image
              source={require('@/assets/images/pin.png')}
              style={styles.markerImage}
            />
          </View>
        </Marker>
      </MapView>
      {locationDetails && (
        <View style={styles.bottomBox}>
          <AddressBar
            mainAddress={`${locationDetails.neighbourhood}, ${locationDetails.city}`}
            subAddress={`${
              locationDetails.houseNumber
                ? locationDetails.houseNumber
                : locationDetails.road
            }, ${locationDetails.suburb}, ${locationDetails.city}, ${
              locationDetails.state
            }`}
            borderColor="#67AE6E"
            onNext={handleOnNext}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  bottomBox: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  boxText: {
    fontSize: 16,
    fontWeight: '600',
  },
  markerImage: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
});

export default MapSelector;
