import LoadingImage from './Spinner-1s-400px.gif'

function LoadingIndicator ({loading}) {
    if (loading) {
    return <img src={LoadingImage}/>
    } else {
        return null;
    }
}

export default LoadingIndicator;