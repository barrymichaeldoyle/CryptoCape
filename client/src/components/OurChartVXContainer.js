import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { ParentSize } from "@vx/responsive";
// import OurBrushChart from './OurBrushChart';
import { LinearGradient } from '@vx/gradient';
import OurChartVX from './OurChartVX';
import { priceFormat, subtractNumbers, percToColor } from '../utils';
import Loading from './Loading';
import { withParentSize } from '@vx/responsive';

const styles = theme => ({
    outerContainer: {
        display: 'flex',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        overflow: 'hidden'
    },
    center: {
        flexDirection: 'column',
        display: 'flex',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    innerContainer: {
        flex: 1,
        display:'flex'
    },
    brushContainer: {
        height: '100px'
    },
    chart: {
        flexDirection: 'column',
        display:'flex',
        backgroundColor: '#000628',
        color: 'white',
        borderRadius: '4px',
        width: '100%'
    },
    vxChartTitle: {
        color: 'white'
    },
    disclaimer: {
        color: 'black',
        opacity: 0.6
    },
    spacer: {
        flex: 1
    },
    titleBar: {
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        padding: '15px',
    },
    leftTitles: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    rightTitles: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    vxPriceIncrease: {
        color: 'limegreen'
    },
    vxPriceDecrease: {
        color: 'red'
    }
});

function Background({width, height}) {
    return (
        <svg width={width} height={height}>
            <LinearGradient id="fill" vertical={false}>
                <stop stopColor="#2d0056" offset="0%" />
                <stop stopColor="#3f51b5" offset="100%" />
            </LinearGradient>
            <rect
                width={width}
                height={height}
                fill="url(#fill)"
            />
        </svg>
    );
}

const OurChartVXContainer = ({ 
    margin,
    enableFiatConversion,
    classes,
    chartTitle,
    chartSubtitle,
    isConsideredMobile,
    chartData = [],
    parentWidth,
    parentHeight,
    isChartLoading,
    chartCurrency,
    enableCurveStepAfter = false,
    timebox,
    timeboxTimestamp,
    genesisProgress,
    isEth2DepositContract,
}) => {
    const [prices, setPrices] = useState(chartData);
    const [currentPrice, setCurrentPrice] = useState(false);
    const [diffPrice, setDiffPrice] = useState(0);
    const [hasIncreased, setHasIncreased] = useState(true);
    const [percentDiff, setPercentDiff] = useState(0);
    const [useIsEth2DepositContract, setUseIsEth2DepositContract] = useState(isEth2DepositContract);
    const [useHideTooltipTimestamp, setHideTooltipTimestamp] = useState(new Date().getTime());

    useEffect(() => {
        setPrices(chartData);
    }, [chartData])

    useEffect(() => {
        setUseIsEth2DepositContract(isEth2DepositContract);
    }, [isEth2DepositContract])

    useEffect(() => {
        if (prices && prices.length  > 0) {
            let indexOfFirstNonZeroValue = prices.findIndex(priceObj=> priceObj.price > 0);
            if(indexOfFirstNonZeroValue > -1) {
                let firstPrice = prices[indexOfFirstNonZeroValue].price * 1;
                let currentPriceLocal = prices[prices.length - 1].price * 1;
                let diffPriceLocal = subtractNumbers(currentPriceLocal, firstPrice) * 1;
                setCurrentPrice(currentPriceLocal);
                setPercentDiff(((currentPriceLocal * 100) / firstPrice) - 100);
                setDiffPrice(diffPriceLocal);
                setHasIncreased(diffPriceLocal >= 0);
            }
        }
        setPrices(prices);
    }, [prices])

    return (
        <div className={classes.outerContainer}>
            <Loading isLoading={isChartLoading} width={parentWidth} height={parentHeight}/>
            <div className={classes.center}>
                <div className={classes.chart + " elevation-shadow-two"} style={{ width: '100%', height: isConsideredMobile ? '500px' : '500px'}}>
                    <div className={classes.titleBar}>
                        <div className={classes.leftTitles}>
                            <div>
                                <Typography className={classes.vxChartTitle + " no-padding-bottom"} variant="headline" component="h2">
                                    {chartTitle}
                                </Typography>
                            </div>
                            <div>
                                <Typography className={classes.vxChartTitle + " no-padding-top"} component="p">
                                    {chartSubtitle}
                                </Typography>
                            </div>
                        </div>
                        <div className={classes.spacer}/>
                        <div className={classes.rightTitles}>
                            <div>
                                <Typography className={classes.vxChartTitle + " no-padding-bottom"} variant="headline" component="h2">
                                    {priceFormat(currentPrice, 4, chartCurrency)}
                                </Typography>
                            </div>
                            <div>
                                {useIsEth2DepositContract && 
                                    <Typography className={classes.vxChartTitle + " no-padding-top"} style={{color: percToColor(genesisProgress * 1)}} component="p">
                                        {`${priceFormat(genesisProgress, 2, "%", false)} of min genesis requirement`}
                                    </Typography>
                                }
                                {!useIsEth2DepositContract &&
                                    <Typography className={classes.vxChartTitle + " no-padding-top " + (hasIncreased ? classes.vxPriceIncrease : classes.vxPriceDecrease)} component="p">
                                        {hasIncreased ? ("+ " + priceFormat(percentDiff, 2, "%", false)) : ("- " + priceFormat(percentDiff * -1, 2, "%", false))}
                                    </Typography>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={classes.innerContainer}>
                        <OurChartVX hideTooltipTimestamp={useHideTooltipTimestamp} enableCurveStepAfter={enableCurveStepAfter} isConsideredMobile={isConsideredMobile} chartCurrency={chartCurrency} margin={margin} data={prices} />
                    </div>
                    {/* {!isConsideredMobile && 
                        <div className={classes.brushContainer}>
                            {chartData.length > 0 && <OurBrushChart timeboxTimestamp={timeboxTimestamp} timebox={timebox} setHideTooltipTimestamp={setHideTooltipTimestamp} enableCurveStepAfter={enableCurveStepAfter} setPrices={setPrices} height={100} enableCurveStepAfter={enableCurveStepAfter} isChartLoading={isChartLoading} isConsideredMobile={isConsideredMobile} chartData={chartData} chartCurrency={chartCurrency} />}
                        </div>
                    } */}
                </div>
            </div>
            {/*
                <Typography className={classes.disclaimer} gutterBottom component="p">
                    {chartData.disclaimer}
                </Typography>
            */}
        </div>
    )
}

OurChartVXContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    margin: PropTypes.object.isRequired
};
    
export default withParentSize(withStyles(styles, { withTheme: true })(OurChartVXContainer));