package main

import (
	"fmt"
	"gitlab.com/AgentNemo/goradios"
)

func main() {
	fmt.Println("station")
	stations := goradios.FetchStations(goradios.StationsByCountry, "japan")
	// fmt.Println(fmt.Println(stations))
	for _, station := range stations {
		fmt.Printf("%+v\n", station) 
		// fmt.Println(station.URL)
	}
	// fmt.Printf("key=%d, station=%s\n",key, station)
}
