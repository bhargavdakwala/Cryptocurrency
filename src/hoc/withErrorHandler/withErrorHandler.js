import React, { Component } from 'react'
import { Modal } from 'antd'

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null
		}

		UNSAFE_componentWillMount() {
			this.reqInterceptor = axios.interceptors.request.use(req => {
				this.setState({ error: null })
				return req
			})
			this.resInterceptor = axios.interceptors.response.use(
				res => res,
				error => {
					console.log('res')
					this.setState({ error: error })
				}
			)
		}

		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor)
			axios.interceptors.response.eject(this.resInterceptor)
			console.log(this.state.error)
		}

		componentDidMount() {
			if (this.state.error) {
				Modal.error({
					title: 'Error message',
					content: <p>{this.state.error}</p>
				})
			}
		}

		render() {
			return <WrappedComponent {...this.props} />
		}
	}
}

export default withErrorHandler
