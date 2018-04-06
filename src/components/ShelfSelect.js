import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import PropTypes from 'prop-types'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const style = {
    display: 'inline-block',
    float: 'left',
    margin: '0',
    padding:'0',
    fontSize: '0.8em',
    width: '130px'
  };

class ShelfSelect extends Component {

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme)};
    }

    render(){
        const {shelves, onUpdateBook, book} = this.props

    return (
        <div className='bookShelf-box'>
            <SelectField 
                floatingLabelText='Shelf:'
                value={book.shelf || 'none'}
                onChange={(event, selectedIndex, value) => onUpdateBook(book, value)}
                autoWidth={true}
                fullWidth
                style={style}
            >
                <MenuItem 
                    key=''
                    value='none'
                    label='None'
                    primaryText='None'
                />
                {shelves.map((shelf, index) => (
                    <MenuItem 
                        key={index}
                        value={shelf.id}
                        label={shelf.name}
                        primaryText={shelf.name}
                    />
                ))}
            </SelectField>
        </div>
    )}
}

ShelfSelect.childContextTypes = {
    muiTheme: PropTypes.object.isRequired
};

ShelfSelect.propTypes = {
    shelves: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired
    
}

export default ShelfSelect;