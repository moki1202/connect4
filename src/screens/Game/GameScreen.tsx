import React, { useState, useCallback, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Dimensions,
  Image,
  BackHandler,
} from 'react-native'
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated'
import _ from 'lodash'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import RouteNames from '../../navigation/RouteNames'

const ROWS = 6
const COLUMNS = 7
const { width } = Dimensions.get('window')
const CELL_SIZE = (width - 20) / COLUMNS - 5

const GameScreen: React.FC = ({ route }: any) => {
  const [grid, setGrid] = useState<number[][]>(
    _.times(ROWS, () => _.times(COLUMNS, _.constant(0)))
  )
  const [currentPlayer, setCurrentPlayer] = useState<number>(1)

  const { player1Name, player2Name, numColumns, numRows } = route.params

  const navigation: any = useNavigation()

  const dropAnimations = _.times(ROWS, () =>
    _.times(COLUMNS, () => useSharedValue(-300))
  )

  useFocusEffect(
    useCallback(() => {
      setGrid(_.times(ROWS, () => _.times(COLUMNS, _.constant(0))))
      setCurrentPlayer(1)
    }, [])
  )

  useEffect(() => {
    const backAction = () => {
      navigation.navigate(RouteNames.Lobby)
      return true
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove()
  }, [navigation])

  const check_winner = (grid: number[][], player: number): boolean => {
    // this checks for horizontal
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS - 3; col++) {
        if (
          grid[row][col] === player &&
          grid[row][col + 1] === player &&
          grid[row][col + 2] === player &&
          grid[row][col + 3] === player
        ) {
          return true
        }
      }
    }

    // this checks for vertical
    for (let col = 0; col < COLUMNS; col++) {
      for (let row = 0; row < ROWS - 3; row++) {
        if (
          grid[row][col] === player &&
          grid[row + 1][col] === player &&
          grid[row + 2][col] === player &&
          grid[row + 3][col] === player
        ) {
          return true
        }
      }
    }

    // Check diagonal (top-left to bottom-right)
    for (let row = 0; row < ROWS - 3; row++) {
      for (let col = 0; col < COLUMNS - 3; col++) {
        if (
          grid[row][col] === player &&
          grid[row + 1][col + 1] === player &&
          grid[row + 2][col + 2] === player &&
          grid[row + 3][col + 3] === player
        ) {
          return true
        }
      }
    }

    // Check diagonal (bottom-left to top-right)
    for (let row = 3; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS - 3; col++) {
        if (
          grid[row][col] === player &&
          grid[row - 1][col + 1] === player &&
          grid[row - 2][col + 2] === player &&
          grid[row - 3][col + 3] === player
        ) {
          return true
        }
      }
    }

    return false
  }

  const handle_press = (column: number) => {
    for (let row = ROWS - 1; row >= 0; row--) {
      if (grid[row][column] === 0) {
        const newGrid = _.cloneDeep(grid)
        newGrid[row][column] = currentPlayer

        dropAnimations[row][column].value = -300
        dropAnimations[row][column].value = withTiming(0, {
          duration: 500,
          easing: Easing.bounce,
        })

        setGrid(newGrid)

        if (check_winner(newGrid, currentPlayer)) {
          const winnerName = currentPlayer === 1 ? player1Name : player2Name
          const timeoutId = setTimeout(() => {
            navigation.navigate('Winner', { winner: winnerName })
          }, 500)

          return () => clearTimeout(timeoutId)
        }

        setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
        break
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect 4</Text>
      <Text style={styles.turnText}>
        {currentPlayer === 1
          ? `${player1Name}'s Turn`
          : `${player2Name}'s Turn`}
      </Text>
      <View style={styles.grid}>
        {grid.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {row.map((cell, columnIndex) => {
              const animatedStyle = useAnimatedStyle(() => ({
                transform: [
                  {
                    translateY: dropAnimations[rowIndex][columnIndex].value,
                  },
                ],
              }))

              return (
                <Pressable
                  key={`${rowIndex}-${columnIndex}`}
                  onPress={() => handle_press(columnIndex)}
                >
                  <View style={styles.cell}>
                    <Animated.View style={animatedStyle}>
                      <Image
                        source={
                          cell === 1
                            ? require('../../assets/coins/red-coin.png')
                            : cell === 2
                            ? require('../../assets/coins/yellow-coin.png')
                            : null
                        }
                        style={styles.coin}
                        resizeMode='contain'
                      />
                    </Animated.View>
                  </View>
                </Pressable>
              )
            })}
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  turnText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#0142B0',
    padding: 10,
    borderRadius: 25,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: CELL_SIZE / 2,
    backgroundColor: '#21252E',
  },
  coin: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: CELL_SIZE * 0.5,
  },
})

export default GameScreen
