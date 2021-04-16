import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import { Provider as StyletronProvider } from "styletron-react"
import { LightTheme, BaseProvider, styled, DarkTheme } from "baseui"
import { StoreContainer } from "./unstated/StoreContainer"
import { Client as Styletron } from "styletron-engine-atomic"

const engine = new Styletron()

ReactDOM.render(
	<BrowserRouter>
		<StyletronProvider value={engine}>
			<BaseProvider theme={LightTheme}>
				<StoreContainer.Provider>
					<App />
				</StoreContainer.Provider>
			</BaseProvider>
		</StyletronProvider>
	</BrowserRouter>
	,document.getElementById("root"),
)



